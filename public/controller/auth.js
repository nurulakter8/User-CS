import * as Element from '../viewpage/element.js'
import * as FirebaseController from './firebase_controller.js' 

export let currentUser;

export function addEventListener() {
	Element.formSignIn.addEventListener('submit', async e => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		try {
			await FirebaseController.signIn(email, password);
			Element.modalSigninForm.hide();
		} catch (error) {
			console.log(error);
		}

	});

	Element.menuSignout.addEventListener('click', () => {
		try {
			FirebaseController.signOut();
		} catch (error) {
			console.log(error);
		}
	})

	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			//sign in
			currentUser = user;
			let elements = document.getElementsByClassName('model-menus-pre-auth');
			for (let index = 0; index < elements.length; index++)
				elements[index].style.display = 'none';
			elements = document.getElementsByClassName('model-menus-post-auth');
			for (let index = 0; index < elements.length; index++)
				elements[index].style.display = 'block';
		} else {
			//sign out
			currentUser = null;
			let elements = document.getElementsByClassName('model-menus-pre-auth');
			for (let index = 0; index < elements.length; index++)
				elements[index].style.display = 'block';
			elements = document.getElementsByClassName('model-menus-post-auth');
			for (let index = 0; index < elements.length; index++)
				elements[index].style.display = 'none';
		}
	});
}


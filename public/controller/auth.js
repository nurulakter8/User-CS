import * as Element from '../viewpage/element.js'
import * as FirebaseController from './firebase_controller.js' 
import * as Constant from '../model/constant.js' 
import * as Utill from '../viewpage/utill.js'
import * as Route from './route.js'

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
			if (Constant.DEV) console.log(error);
			Utill.info('Sign In Error', JSON.stringify(error), Element.modalSigninForm);
		}

	});

	// creative assignment 
	Element.formResetPassword.addEventListener('submit', async e => {
		e.preventDefault();
		const email = e.target.email.value;
		try {
			await FirebaseController.resetPassword(email);
			Element.modalResetPasswordForm.hide();
		} catch (error) {
			if (Constant.DEV) console.log(error);
			Utill.info('Error, try different Email', JSON.stringify(error), Element.modalResetPasswordForm);
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

			const pathname = window.location.pathname;
			const hash = window.location.hash;
			Route.routing(pathname,hash);
		} else {
			//sign out
			currentUser = null;
			let elements = document.getElementsByClassName('model-menus-pre-auth');
			for (let index = 0; index < elements.length; index++)
				elements[index].style.display = 'block';
			elements = document.getElementsByClassName('model-menus-post-auth');
			for (let index = 0; index < elements.length; index++)
				elements[index].style.display = 'none';

			history.pushState(null,null, Route.routhPath.HOME);
			//Element.root.innerHTML = '<h1>Signed Out</h1>'
		}
	});

	Element.formCreateAccount.addEventListener('submit', async e=> {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		const passwordConfirm = e.target.passwordConfirm.value;

		// reset error msg
		Element.formCreateAccounterror.email.innerHTML = ''

		Element.formCreateAccounterror.passwords.innerHTML = ''

		Element.formCreateAccounterror.passwordConfirm.innerHTML = ''

		let valid = true;
		// email: html validation 
		if(password.length < 6){
			valid = false;
			Element.formCreateAccounterror.passwords.innerHTML = 'at least 6';
		}
		if (passwordConfirm != password){
			valid = false;
			Element.formCreateAccounterror.passwordConfirm.innerHTML = 'do not match';
		}
		if(!valid) return;

		try {
			await FirebaseController.createAccount(email,password);
			Utill.info ('Account Created', 'youre now signed in', Element.modalCreateAccount);
		} catch (e) {
			if (Constant.DEV) console.log(e);
		Utill.info('Error', JSON.stringify(e), Element.modalCreateAccount);
		//return;
		}
	})
}


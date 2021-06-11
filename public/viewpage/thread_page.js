import * as Auth from '../controller/auth.js'
import * as Element from './element.js'


export function addviewButtonListeners(){

	const viewButtonForms = document.getElementsByClassName('thread-view-form');
	for (let i = 0; i < viewButtonForms.length; i++) {
		addViewFormSubmitEvent(viewButtonForms[i])
	}

}

function addViewFormSubmitEvent(form){
	form.addEventListener('submit' , e => {
		e.preventDefault();
		const threadId = e.target.threadId.value;
		thread_page(threadId);
		
	})
}

function thread_page (threadId){
	if(!Auth.currentUser){
		Element.root.innerHTML = '<h1> Protected Page<h1>'
		return
	}

	Element.root.innerHTML = `Thread id: ${threadId}`
}
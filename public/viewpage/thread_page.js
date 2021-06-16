import * as Auth from '../controller/auth.js'
import * as Element from './element.js'
import * as FirebaseController from '../controller/firebase_controller.js';
import * as Utill from './utill.js'
import * as Constant from '../model/constant.js'
import { Reply } from '../model/reply.js'
import * as Route from '../controller/route.js'
import { home_page } from './home_page.js';



export function addviewButtonListeners() {

	const viewButtonForms = document.getElementsByClassName('thread-view-form');
	for (let i = 0; i < viewButtonForms.length; i++) {
		addViewFormSubmitEvent(viewButtonForms[i])
	}

}
// creative assignment 1
export function addDeleteButtonListeners() {

	const addDeleteFormSubmit = document.getElementsByClassName('thread-delete-form');
	for (let i = 0; i < addDeleteFormSubmit.length; i++) {
		addDeleteFormSubmitEvent(addDeleteFormSubmit[i])
	}

}

export function addViewFormSubmitEvent(form) {
	form.addEventListener('submit', async e => {
		e.preventDefault();

		const button = e.target.getElementsByTagName('button')[0]; // submit create button
		const label = Utill.disableButton(button);


		const threadId = e.target.threadId.value;
		history.pushState(null, null, Route.routhPath.THREAD + '#' + threadId);
		await thread_page(threadId);
		Utill.enableButton(button, label);
	})
}
// creative assignment 1
export function addDeleteFormSubmitEvent(form) {
	form.addEventListener('submit', async e => {
		e.preventDefault();
		let thread;
			let replies;
			const threadId = e.target.threadId.value;
		try {

			thread  = await FirebaseController.deleteThread(threadId);
			await home_page();
			replies = await FirebaseController.getReplayList(threadId)
		} catch (e) {
			if (Constant.DEV) console.log(e);
			Utill.info('Error', JSON.stringify(e))
			return;
		}

	})
}

export async function thread_page(threadId) {
	if (!Auth.currentUser) {
		Element.root.innerHTML = '<h1> Protected Page<h1>'
		return
	}

	if (!threadId) {
		Utill.info('Error', 'Thread Id is null; Invalid access')
		return;
	}
	//1. get thread form firestore by id 
	//2. get all replies to this thread
	//3. display this thread
	//4. display all replay message
	//5. add a form for a new replay 

	//1. get thread form firestore by id 
	let thread;
	let replies;

	try {
		thread = await FirebaseController.getOneThread(threadId)
		if (!thread) {
			Utill.info('Error', 'Thread does not Exist');
			return;
		}
		replies = await FirebaseController.getReplayList(threadId)
	} catch (e) {
		if (Constant.DEV) console.log(e);
		Utill.info('Error', JSON.stringify(e))
		return;

	}

	//3. display this thread
	let html = `
		<h4 class = "bg-primary text-white"> ${thread.title} </h4>
		<div> ${thread.email} (At ${new Date(thread.timestamp).toString()})</div>
		<div class="bg-secondary text-white"> ${thread.content}</div>
		<hr>
	`;

	html += '<div id ="message-reply-body">'
	//display all replies 
	if (replies && replies.length > 0) {
		replies.forEach(r => {
			html += buildReplyView(r)
		})
	}
	html += '</div>'

	//add new reply 
	html += `
		<div>
			<textarea id="textarea-add-new-reply" placeholder="reply to this thread"> </textarea>
			<br>
			<button id="button-add-new-reply" class="btn btn-outline-info"> Post reply </button>
		</div>
	`;

	Element.root.innerHTML = html;

	document.getElementById('button-add-new-reply').addEventListener('click', async () => {
		const content = document.getElementById('textarea-add-new-reply').value;
		const uid = Auth.currentUser.uid;
		const email = Auth.currentUser.email;
		const timestamp = Date.now();
		const reply = new Reply({
			uid, email, timestamp, content, threadId
		});

		const button = document.getElementById('button-add-new-reply');
		const label = Utill.disableButton(button);

		try {
			const docId = await FirebaseController.addReply(reply);
			reply.docId = docId;

		} catch (e) {
			if (Constant.DEV) console.log(e)
			Utill.info('Error', JSON.stringify(e))

		}

		const replyTag = document.createElement('div');
		replyTag.innerHTML = buildReplyView(reply)
		document.getElementById('message-reply-body').appendChild(replyTag);
		document.getElementById('textarea-add-new-reply').value = ''

		Utill.enableButton(button, label);

	})
}

function buildReplyView(reply) {
	return `
		<div class ="border border-primary"> 
			<div class= "bg-info text-white"> 
				Replied by ${reply.email} (At ${new Date(reply.timestamp).toString()})
			</div> 
			${reply.content}
		</div>
		<hr>
	`;
}
import * as Auth from '../controller/auth.js'
import * as Element from './element.js'
import * as FirebaseController from '../controller/firebase_controller.js';
import * as Utill from './utill.js'
import * as Constant from '../model/constant.js'
import {Reply} from '../model/reply.js'

export function addviewButtonListeners() {

	const viewButtonForms = document.getElementsByClassName('thread-view-form');
	for (let i = 0; i < viewButtonForms.length; i++) {
		addViewFormSubmitEvent(viewButtonForms[i])
	}

}

export function addViewFormSubmitEvent(form) {
	form.addEventListener('submit', e => {
		e.preventDefault();
		const threadId = e.target.threadId.value;
		thread_page(threadId);

	})
}

async function thread_page(threadId) {
	if (!Auth.currentUser) {
		Element.root.innerHTML = '<h1> Protected Page<h1>'
		return
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
		const reply = new Reply ({
			uid, email, timestamp, content, threadId
		});

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
	})
}

function buildReplyView (reply){
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
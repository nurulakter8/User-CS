import * as Element from './element.js'
import * as Route from '../controller/route.js'
import * as Auth from '../controller/auth.js'
import { Thread } from '../model/thread.js';
import * as Constant from '../model/constant.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Utill from './utill.js'
import * as ThreadPage from './thread_page.js'

export function addEventListener() {
	Element.menuHome.addEventListener('click', () => {
		history.pushState(null, null, Route.routhPath.HOME);
		home_page();
	})

	Element.formCreateThread.addEventListener('submit', async e => {
		e.preventDefault();
		const title = e.target.title.value;
		const content = e.target.content.value;
		const keywords = e.target.keywords.value;
		const uid = Auth.currentUser.uid;
		const email = Auth.currentUser.email;
		const timestamp = Date.now();
		const keywordsArray = keywords.toLowerCase().match(/\S+/g);
		const thread = new Thread({
			uid, title, content, email, timestamp, keywordsArray
		});

		try {
			const docId = await FirebaseController.addThread(thread);
			thread.docId = docId;
			//home_page(); // lesson 2
			const trTag = document.createElement('tr');
			trTag.innerHTML = buildThreadView(thread);
			const threadTableBody = document.getElementById('thread-table-body');
			threadTableBody.prepend(trTag);
			const viewForms = document.getElementsByClassName('thread-view-form')
			ThreadPage.addViewFormSubmitEvent(viewForms[0])

			const noThreadFound = document.getElementById('no-thread-found');
			if (noThreadFound)
			noThreadFound.innerHTML = ''
			e.target.reset(); // clears entry in the form

			Utill.info('Sucess', ' A new thread has been created', Element.modalCreateThread);
		} catch (error) {
			if (Constant.DEV) console.log(error);

			Utill.info('Error to add', JSON.stringify(error), Element.modalCreateThread);
		}
	})
}

export async function home_page() {
	if (!Auth.currentUser) {
		Element.root.innerHTML = '<h1> Not allowed</h1>'
		return;
	}

	let threadList;
	try {
		threadList = await FirebaseController.getThreadList();
	} catch (e) {
		if (Constant.DEV) console.log(e);
		Utill.info('error', JSON.stringify(e))
	}

	buildHomeScreen(threadList);

}


function buildHomeScreen(threadList) {
	let html = ''
	html += `
		<button class = "btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#modal-create-thread">+ New Thread </button>
	`;

	

	html += `
	<table class="table" table-striped>
		<thead>
	  		<tr>
				<th scope="col">Action</th>
				<th scope="col">Title</th>
				<th scope="col">KeyWords</th>
				<th scope="col">Posted By</th>
				<th scope="col">Content By</th>
				<th scope="col">Posted At</th>
	  		</tr>
		</thead>
		<tbody id="thread-table-body">	
	`

	threadList.forEach(thread => {
		html += `
		<tr>
		${buildThreadView (thread)}
		</tr>
		`
	})

	html += '</tbody></table>'
	Element.root.innerHTML = html;

	if (threadList.length == 0) {
		html += '<h4 id ="no-thread-found"> No Threads Found</h4>'
		Element.root.innerHTML = html;
		return;
 
	}

	ThreadPage.addviewButtonListeners();

}

function buildThreadView (thread){
	return `
		<td> 
			<form method ="post" class= "thread-view-form">
				<input type = "hidden" name ="threadId" value="${thread.docId}">
				<button type="submit" class="btn btn-outline-primary"> View </button>
			</form>
		</td>
		<td> ${thread.title}</td>
		<td> ${!thread.keywordsArray || Array.isArray(thread.keywordsArray) ? '' :  thread.keywordsArray.join(' ')}</td>
		<td> ${thread.email}</td>
		<td> ${thread.content}</td>
		<td> ${new Date(thread.timestamp).toString()}</td>

	`;
}
import * as Element from './element.js'
import * as Route from '../controller/route.js'

export function addEventListener (){
	Element.menuAbout.addEventListener('click', () => {
		history.pushState(null,null, Route.routhPath.ABOUT);
		about_page();
	})
}

export function about_page(){
	Element.root.innerHTML= '<h1> About Page</h1>'
}
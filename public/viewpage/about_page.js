import * as Element from './element.js'

export function addEventListener (){
	Element.menuAbout.addEventListener('click', () => {
		about_page();
	})
}

export function about_page(){
	Element.root.innerHTML= '<h1> About Page</h1>'
}
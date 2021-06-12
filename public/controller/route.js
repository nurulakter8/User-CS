import * as Home from '../viewpage/home_page.js'
import * as About from '../viewpage/about_page.js'
import * as ThreadPage from '../viewpage/thread_page.js'

export const routhPath = {
	HOME: '/',
	ABOUT: '/about',
	THREAD: '/thread',
}

export const routes = [
	{path: routhPath.HOME, page: Home.home_page},
	{path: routhPath.ABOUT, page: About.about_page},
	{path: routhPath.THREAD, page: ThreadPage.thread_page},

	
];

export function routing (pathname, hash){
	const route = routes.find(r => r.path == pathname);
	if (route){
		if (hash && hash.length > 1)
		route.page(hash.substring(1));
		else 
		route.page();
	} 
	else route[0].page();
}
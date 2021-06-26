import * as Home from '../viewpage/home_page.js'
import * as About from '../viewpage/about_page.js'
import * as Donations from '../viewpage/donate_page.js'
import * as ThreadPage from '../viewpage/thread_page.js'
import * as Search from '../viewpage/search_page.js'

export const routhPath = {
	HOME: '/',
	ABOUT: '/about',
	DONATE: '/donate',
	THREAD: '/thread',
	SEARCH: '/search',
}

export const routes = [
	{path: routhPath.HOME, page: Home.home_page},
	{path: routhPath.ABOUT, page: About.about_page},
	{path: routhPath.DONATE, page: Donations.donate_page},
	{path: routhPath.THREAD, page: ThreadPage.thread_page},
	{path: routhPath.SEARCH, page: Search.search_page},
	
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
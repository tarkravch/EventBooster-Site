import Search from '../javascript/search/search-class';

import eventList from '../view/template/event-list.hbs';
import modalCard from '../view/template/modal-card.hbs';
import { launchPagination } from './pagination';

export async function createModal(id) {
	const searchE = new Search();

	await searchE.getEventById(id);

	searchE.eventById._embedded.events[0].img = searchE.eventById._embedded.events[0].images.find(img => img.ratio === '16_9');

	document.querySelector('.lightbox__content').innerHTML = modalCard(searchE.eventById._embedded.events[0]);

	const searchMoreByAuthor = document.querySelector('.main');
	searchMoreByAuthor.addEventListener('click', searchMore);
}

export function createCardElement(data) {
	data._embedded.events.forEach(event => {
		event.img = event.images.find(img => img.ratio === '4_3');
	});

	document.querySelector('.cardset__list').innerHTML = eventList(data._embedded.events);
}

async function searchMore(e) {
	const searche = new Search();
	searche.keyword = document.querySelector('.author').innerHTML;
	await searche.getEvent();
	createCardElement(searche.searchE); // <= обЪект данных.
	launchPagination(searche.searchE);
}

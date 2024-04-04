import {
	CLIENT_EMAIL,
	CLIENT_ID,
	PRIVATE_KEY,
	PRIVATE_KEY_ID,
	PROJECT_ID,
	SHEET_ID,
	UNIVERSE_DOMAIN
} from '$env/static/private';
import { getTodaysDate } from '$lib';
import * as googleapis from 'googleapis';
import type { PageServerLoad } from './$types';

export interface PageData {
	listings: SheetsData;
	metadata: SheetsMetaData;
}
interface SheetsData {
	[category: string]: {
		places: {
			name: string;
			location: string;
		}[];
		emoji: string;
	};
}

interface SheetsMetaData {
	modifiedDate: string;
}

export const load: PageServerLoad = async (): Promise<PageData> => {
	const auth = await googleapis.google.auth.getClient({
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
		credentials: {
			type: 'service_account',
			project_id: PROJECT_ID,
			private_key_id: PRIVATE_KEY_ID,
			private_key: PRIVATE_KEY,
			client_email: CLIENT_EMAIL,
			client_id: CLIENT_ID,
			universe_domain: UNIVERSE_DOMAIN
		}
	});

	const sheets = googleapis.google.sheets({ version: 'v4', auth });
	const placeList = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range: 'List!A3:D'
	});

	const modifiedDate = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range: 'List!B1'
	});

	const rows = placeList.data.values;
	const listings: SheetsData = {};

	if (!rows || rows.length === 0) {
		console.log('No data found.');
		return { listings, metadata: { modifiedDate: getTodaysDate() } };
	}

	rows.forEach((row) => {
		const [category, place, location, emoji] = row;
		if (!listings[category]) {
			listings[category] = {
				places: [],
				emoji: ''
			};
		}

		listings[category].places.push({
			name: place,
			location
		});
		listings[category].emoji = emoji;
	});

	return {
		listings,
		metadata: {
			modifiedDate: String(modifiedDate?.data?.values?.[0])
		}
	};
};

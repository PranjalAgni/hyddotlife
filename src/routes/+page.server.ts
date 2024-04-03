import {
	PROJECT_ID,
	PRIVATE_KEY,
	PRIVATE_KEY_ID,
	CLIENT_EMAIL,
	SHEET_ID,
	CLIENT_ID,
	UNIVERSE_DOMAIN
} from '$env/static/private';
import * as googleapis from 'googleapis';
import type { PageServerLoad } from './$types';

export interface SheetsData {
	[category: string]: {
		places: {
			name: string;
			location: string;
		}[];
		emoji: string;
	};
}
export const load: PageServerLoad = async () => {
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
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range: 'List!A2:D'
	});

	const rows = res.data.values;
	const data: SheetsData = {};

	if (!rows || rows.length === 0) {
		console.log('No data found.');
		return data;
	}

	rows.forEach((row) => {
		const [category, place, location, emoji] = row;
		if (!data[category]) {
			data[category] = {
				places: [],
				emoji: ''
			};
		}

		data[category].places.push({
			name: place,
			location
		});
		data[category].emoji = emoji;
	});

	return data;
};

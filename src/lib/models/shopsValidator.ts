import { object, string, number, date, mixed } from 'yup';

import type { InferType } from 'yup';

let shopSchema: InferType<any> = object({
	name: 
		string()
			.min(3, 'The name must be at least 3 characters long')
			.max(30, 'The name cannot be longer than 30 characters')
			.required('Name is required'),
	address: 
		string()
			.max(255, 'The address cannot be longer than 255 characters'),
	zipCode: 
		string()
			.nullable(),
	country: 
		string()
			.required('Country is required'),
	VATNumber: 
		string()
			.nullable(),
	imageName: 
		string()
			.nullable(),
	imageSize: 
		number()
			.nullable(),
	updatedAt: 
		date()
			.nullable(),
	colorTheme: 
		string()
			.oneOf(['skeleton', 'wintry', 'modern', 'hamlindigo', 'rocket', 'sahara', 'gold-nouveau', 'vintage', 'seafoam', 'crimson'])
			.nullable(),
	phoneNumber: 
		string()
			.nullable(),
	email: 
		string()
			.email('Invalid email format')
			.nullable(),
	website: 
		string()
			.url('Invalid URL format')
			.nullable(),
	isActive: 
		mixed()
			.required('Activation status is required')
			.oneOf([true, false], 'Invalid activation status'),
	logoName: 
		string()
			.nullable(),
	logoSize: 
		number()
			.nullable(),
	shopType: 
		string()
			.nullable(),
});

export default shopSchema;
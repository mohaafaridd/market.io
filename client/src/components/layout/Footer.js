import React from 'react';

const Footer = () => {
	const contacts = [
		{
			id: 0,
			name: 'Github',
			class: 'github',
			url: 'https://github.com/Mohammed-Farid',
			icon: 'fab fa-github',
		},
		{
			id: 1,
			name: 'Twitter',
			class: 'twitter',
			url: 'https://twitter.com/mohaafaridd',
			icon: 'fab fa-twitter',
		},
		{
			id: 2,
			name: 'Facebook',
			class: 'facebook',
			url: 'https://www.facebook.com/mohaafaridd',
			icon: 'fab fa-facebook-f',
		},
	];
	return (
		<footer id='app-footer'>
			<h5>This application was designed and developed by Mohammed Farid</h5>
			<ul>
				{contacts.map(contact => (
					<li key={contact.id} className={contact.class}>
						<a target='_blank' href={contact.url}>
							<i className={contact.icon}></i>
							{contact.name}
						</a>
					</li>
				))}
			</ul>
		</footer>
	);
};

export default Footer;

import React from 'react';
import firebase from './firebase.js';

function DatabaseSearch()	{
	const db= firebase.database();
	const blogs= db.child('blogs');
	const blogQuery= blogs.orderByChild('title').equalTo(props.query).limitToFirst(10);

	const username= db.child('user_metadata');
	const displayName= username.orderByChild('display_name').equalTo(props.query).limitToFirst(10);

	const pseudonym= username.orderByChild('pseudonym').equalTo(props.query).limitToFirst(10);
	return (
		<div>
			{blogQuery}</br>
			{displayName}</br>
			{pseudonym}</br>
		</div>
	);
}
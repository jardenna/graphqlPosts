import React from 'react';
import { Link } from 'react-router-dom';

import Image from '@commonReact/Image';


function Card({to, body, src, alt,  username, date,  btnFirst, btnSecond, btnThird, showBtnThird}){




	const localeDate = new Date(date).toLocaleDateString();
	return(

		<section className="card card-horizontal" >
			<header className="card-header">
				<div className="header-info">

					<h2>{username}</h2>
					<time dateTime={localeDate}>{localeDate}</time>
				</div>
				<figure className="card-img">

					<Image
						src={src}
						alt={alt}
					/>
				</figure>
			</header>


			<div className="card-content">
				{body}
				{	to && <Link to={to}>Go to post</Link>}
			</div>
			<footer className="card-footer">

				{btnFirst}
				{btnSecond}
				{showBtnThird && btnThird}


			</footer>

		</section>

	);
}
export default Card;

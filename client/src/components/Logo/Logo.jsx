import React from 'react';
import HomeDBLogo from "assets/img/homedb.svg";

const Logo = (props) => {
	const {title, width, height} = props.config;

	return (
		<img alt={title} title={title} width={width || 'auto'} height={height || 'auto'} src={HomeDBLogo}/>
	);
}

export default Logo;

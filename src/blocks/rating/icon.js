/**
 * External dependencies
 */
import { Icon, Path, SVG } from '@wordpress/components';

export const BlockIcon = className => (
	<Icon
		className={ className }
		icon={
			<svg viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
				<path d="M2.3,17.3h9.3c0.1,0,0.3,0,0.4,0.1l5.9,4.2c0.3,0.2,0.7,0,0.7-0.3v-3.7c0-0.2,0.2-0.4,0.4-0.4H22 c1.1,0,2-0.9,2-2V2.5c0-1.2-0.7-2.2-2-2.2H2.3C0.7,0.2,0,0.9,0,2.5v12.3C0,16.3,0.7,17.3,2.3,17.3z" />
				<polygon
					fill="#ffffff"
					points="8.8,12.1 6.5,10.9 4.1,12.1 4.5,9.5 2.6,7.6 5.3,7.2 6.5,4.8 7.6,7.2 10.3,7.6 8.4,9.5"
				/>
				<path
					fill="#ffffff"
					d="M20.7,7.9h-7c-0.5,0-0.9-0.4-0.9-0.9S13.2,6,13.7,6h7c0.5,0,0.9,0.4,0.9,0.9S21.2,7.9,20.7,7.9z"
				/>
				<path
					fill="#ffffff"
					d="M20.7,11.5h-7c-0.5,0-0.9-0.4-0.9-0.9s0.4-0.9,0.9-0.9h7c0.5,0,0.9,0.4,0.9,0.9S21.2,11.5,20.7,11.5z"
				/>
			</svg>
		}
	/>
)

const getClassName = props => ( props && props.className ? props.className : '' );

export const StarIcon = props => {
	const className = getClassName( props );

	return (
		<SVG
			xmlns="https://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			color="#eba845"
		>
			<Path
				className={ className }
				fill="#eba845"
				stroke="#eba845"
				d="M12,17.3l6.2,3.7l-1.6-7L22,9.2l-7.2-0.6L12,2L9.2,8.6L2,9.2L7.5,14l-1.6,7L12,17.3z"
			/>
		</SVG>
	);
};

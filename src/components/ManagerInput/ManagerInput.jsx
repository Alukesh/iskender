import React, { useEffect, useState } from 'react'
import { ReactComponent as ArrowDown } from "../icons/arrow-down.svg";
import { ReactComponent as XIcon } from "../icons/x.svg";
import { ReactComponent as WalletIcon } from "../icons/wallet.svg";
import Loader from '../Loader/Loader';

const ManagerInput = ({setState,state,label, data, renderJsx, customClass, clickValue, isClient = false}) => {
	const [isSearchActive, setSearchActive] = useState(false);
	const [searchTerms, setSearchTerms] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [statusColor, setStatusColor] = useState('');
	useEffect(() => {
		if (!isClient) {
			setSearchResults(data)
		}
	}, [])
	useEffect(() => {
		if(state) {
			setState((prev) => ({...prev, statusName: searchTerms}))
		}
	}, [searchTerms]);
	const handleSelect = (e) => {
		const searchTerm = e.target.value;
		let filteredResults = []

		if (isClient) {
			filteredResults = data.filter((item) =>
				Object.values(item.user).some(
					(value) =>
						typeof value === 'string' &&
						value.includes(searchTerm)
				)
			);
		} else {
			filteredResults = data.filter((item) =>
				Object.values(item).some(
					(value) =>
						typeof value === 'string' &&
						value.toLowerCase().includes(searchTerm.toLowerCase())
				)
			);

			if (filteredResults.length === 0) {
				filteredResults = data
			}
		}

		setSearchTerms(searchTerm)

		setSearchResults(filteredResults)
	}

	const handleClick = (item) => {
		setSearchTerms(clickValue(item))

		if (item.color) {
			setStatusColor(item.color)
		}
	}

	const handleFocus = () => {
		setSearchActive(true)
	}

	const handleBlur = (e) => {
		setTimeout(() => {
			setSearchActive(false)
		}, 300)
	}

	const renderer = () => {
		return searchResults.map(item => renderJsx(item, handleClick))
	}

	return (
		<div className="form_group status-order-s" style={{ '--status-color': statusColor ? '#fff' : '#000' }}>
			<p className="form_label">
				{label}
			</p>

			<div
				className={`
				form_select status-order-s
				${customClass ? customClass : ''}
				${isSearchActive && searchResults.length > 0 ? 'active' : ''}               
			`}
				style={{ background: statusColor ? statusColor : (isSearchActive ? 'transparent' : '#F6F6F6') }}
			>
				<div className="form_select__top">
					<input
						type="text"
						placeholder='Статус заказа'
						className="form_select__input status-order-s"
						value={searchTerms}
						onChange={handleSelect}
						onFocus={handleFocus}
						onBlur={handleBlur}
						style={{ color: statusColor ? '#fff' : '#000' }}
					/>

					{isSearchActive && searchResults.length > 0
						? <XIcon onClick={handleBlur} />
						: <ArrowDown onClick={handleFocus} />
					}
				</div>

				<div
					className={`
					form_select__bottom status-order-s
					${isSearchActive && searchResults.length > 0 ? 'active' : ''}
				`}
				>
					{renderer()}
				</div>
			</div>
		</div>
	)
}

export default ManagerInput

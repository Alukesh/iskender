import React from "react"
// import { ReactComponent as ArrowIcon } from "../icons/arrowRight.svg"
// import { ReactComponent as ClockIcon } from "../icons/clock.svg"
// import { ReactComponent as LocationIcon } from "../icons/locationBlue.svg"
// import { ReactComponent as PhoneIco } from "../icons/pnoneBranch.svg"
import PhoneIco  from "../icons/pnoneBranch.svg"
import LocationIcon from "../icons/locationBlue.svg"
import ClockIcon from "../icons/clock.svg"
import ArrowIcon from "../icons/arrowRight.svg"
import logoBranch from "../icons/logoBranch.svg"
import { useNavigate } from "react-router-dom";

const BranchItem = ({ branch }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate('/addresses')} className="branches-item">
            <div className="branches-item_top">
                <img
                    src={logoBranch}
                    alt="logo"
                />
                <div className="branches-item_top-right">
                    <h3>{branch.name}</h3>
                    <div className="branches-item-nav">
                        <p>Открыть в карте</p>
                        <img src={ArrowIcon} alt="Arrow right Icon" />
                    </div>
                </div>
            </div>
            <div className="branches-item-info">
                <div className="branches-item-clock">
                    <img src={ClockIcon} alt="clock" />
                    <span>
                        {branch.start} - {branch.end}
                    </span>
                </div>
                <div className="branches-item-clock">
                    <img src={PhoneIco} alt="call" />
                    <a href={`tel:${branch?.phone || branch?.phone2}`} onClick={e => e.stopPropagation()}>
                        <span>{branch?.phone || branch?.phone2}</span>
                    </a>
                </div>
                <div className="branches-item-clock">
                    <img src={LocationIcon} alt="location" />
                    <span>{branch.address}</span>
                </div>
            </div>
        </div>
    )
}

export default BranchItem

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { baseURL } from "../../services/api"
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen"

const StoriesItem = ({ story, selectStory }) => {
    const dispatch = useDispatch()
    const watched = useSelector((state) => state.stories.watched)
    const isMobile = useCheckMobileScreen(768);

    return (
        <div
            className="stories-item"
            onClick={() => {
                selectStory(story)
                dispatch.stories.setWatched(story._id)
            }}
        >
            <img
                style={{
                    border: `2px solid ${
                        watched[story._id] ? "#5c5c5c" : "#d8effd"
                    }`,
                }}
                src={String(story.img).replace('http://62.217.177.200:8080', baseURL)}
                alt="story image"
                loading="lazy"
            />
            <p className={`Gilroy-n ${isMobile ? 'white' : 'black'}`}>Акции</p>
        </div>
    )
}

export default StoriesItem

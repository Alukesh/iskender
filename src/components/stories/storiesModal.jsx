import React from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as CloseIcon } from "../icons/close.svg"
import { baseURL } from "../../services/api"

const StoriesModal = ({ stories, active,storyId, story, close, selectStory }) => {
    const dispatch = useDispatch()

    const setElementWidth = () => {
      const elementWidth = 100 / stories.length;
      return { width: `${elementWidth}%` };
    };

    return (
        <div className="stories-modal">
            <div className="stories-wrap">
              <div
                  onClick={close}
                  className="stories-modal-close"
              >
                <CloseIcon />
              </div>
              <div className="stories-container-buttons">
                {stories.map((s, index) => (
                    <div
                        key={s._id}
                        onClick={() => {
                          selectStory(s, index)
                          dispatch.stories.setWatched(s._id)
                        }}
                        style={setElementWidth()}
                        className={
                          s._id === story._id
                              ? "stories-button-active"
                              : "stories-button"
                        }
                    ></div>
                ))}
              </div>
            </div>
            <div className='stories-image-wrap'>
                <img
                    onClick={() => {
                      const nextId = storyId + 1
                      stories[nextId] ? selectStory(stories[nextId], nextId) : selectStory(stories[0], 0)
                    }}
                    src={String(story.img).replace('http://62.217.177.200:8080', baseURL)}
                    alt="story image"
                    loading="lazy"
                />
            </div>
        </div>
    )
}

export default StoriesModal

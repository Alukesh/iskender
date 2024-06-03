import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import StoriesItem from "./storiesItem"
import StoriesModal from "./storiesModal"
import StoriesEmptyItem from "./StoriesEmptyItem"

const Stories = () => {
    const widthContainer = useRef(null)
    const [emptyStories, setEmptyStories] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [story, setStory] = useState(null)
    const [storyId, setStoryId] = useState(0)
    const stories = useSelector((state) => state.stories.data)
    const {
        stories: { getStories },
    } = useDispatch()

    // =========

    useEffect(() => {
        const width = widthContainer.current.offsetWidth
        setEmptyStories(Math.floor(width / 90 - stories.length))
    }, [stories])

    useEffect(() => {
        modalOpen
            ? (document.body.style = `overflow: hidden`)
            : (document.body.style = `overflow: visible`)
    }, [modalOpen])

    // ==================

    useEffect(() => {
        const handleResize = () => {
            const width = widthContainer.current.offsetWidth
            setEmptyStories(Math.floor(width / 90 - stories.length))
        }

        window.addEventListener("resize", handleResize)

        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [stories])
    // ===================

    const handleClick = (story) => {
        setModalOpen(true)
        setStory(story)
    }
    
    const handleSelect = (story, index) => {
        setStory(story)
        setStoryId(index)
    }

    useEffect(() => {
        getStories()
    }, [])

    return (
        <div
            ref={widthContainer}
            className="stories container"
        >
            {modalOpen && <div onClick={() => setModalOpen(false)} className="stories-back"></div>}
            <div className="stories-items">
                {stories.map((story) => (
                    <StoriesItem
                        selectStory={handleClick}
                        key={story._id}
                        story={story}
                    />
                ))}
                {emptyStories > 0 &&
                    [...Array(emptyStories)].map((_, id) => (
                        <StoriesEmptyItem key={id} />
                    ))}
            </div>
            {modalOpen && (
                <StoriesModal
                    selectStory={handleSelect}
                    stories={stories}
                    story={story}
                    storyId={storyId}
                    close={() => setModalOpen(false)}
                />
            )}
        </div>
    )
}

export default Stories

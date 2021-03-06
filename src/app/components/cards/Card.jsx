// React Core
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Libs
import get from 'lodash/get';
// Components
// import ModalConfirm from '../ModalConfirm';
// Services
import DateTimeService from '../../services/DateTimeService';


const propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string,
    source: PropTypes.object,
    publishedAt: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,

    isProcessing: PropTypes.bool,
    isBookmarked: PropTypes.bool,
    isDeleted: PropTypes.bool,
    handleBookmark: PropTypes.func,
    handleDelete: PropTypes.func,
    handleRestore: PropTypes.func,
};
const defaultProps = {
    author: null,
    source: {},
    publishedAt: null,
    url: null,
    urlToImage: null,

    isProcessing: false,
    isBookmarked: false,
    isDeleted: false,
    handleBookmark: () => {},
    handleDelete: () => {},
    handleRestore: () => {},
};

const Card = ({
                  title,
                  description,
                  author,
                  source,
                  publishedAt,
                  url,
                  urlToImage,
                  isProcessing,
                  isBookmarked,
                  isDeleted,
                  handleBookmark,
                  handleDelete,
                  handleRestore,
              }) => {

    const [showRestoreModal, toggleRestoreModal] = useState(false);
    
    const decoratePublishDate = () => {
        if (!publishedAt) return null;

        const dateFormat = new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'long', day: '2-digit' });
        const [{ value: mo },,{ value: da },,{ value: ye }] = dateFormat.formatToParts(new Date(publishedAt));
        return `${mo} ${da} ${ye}`;
    }

    // const restoreRequested = () => {
    //     toggleRestoreModal(true)
    // };

    // const restoreConfirmed = () => {
    //     handleRestore();
    //     toggleRestoreModal(false)
    // };

    // const restoreCanceled = () => {
    //     toggleRestoreModal(false)
    // };

    // const renderControls = () => {
    //     return (
    //      <>
    //      {
    //         !isDeleted &&
    //         <button
    //             // variant="danger"
    //             className="uk-button uk-button-danger"
    //             style={{ marginRight: 5 }}
    //             disabled={isProcessing}
    //             onClick={handleDelete}
    //         >
    //             Delete
    //         </button>
    //         }
    //         {
    //         isDeleted &&
    //         <button
    //             // variant="warning"
    //             className="uk-button uk-button-secondary"
    //             style={{ marginRight: 5 }}
    //             disabled={isProcessing}
    //             onClick={restoreRequested}
    //         >
    //             Restore
    //         </button>
    //         }
    //         {
    //         !isDeleted &&
    //         <button
    //             // variant={isBookmarked ? 'success' : 'primary'}
    //             className={isBookmarked ? 'uk-button uk-button-primary' : 'uk-button uk-button-default'}
    //             disabled={isProcessing}
    //             onClick={handleBookmark}
    //         >
    //             {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    //         </button>
    //         }
    //      </>
    //     )
    // };

    return (
        <>
            {/* <ModalConfirm
                title="Card Restore"
                message="Are you want to restore this card?"
                show={showRestoreModal}
                onConfirm={restoreConfirmed}
                onClose={restoreCanceled}
            /> */}
            <div className="card-wrapper uk-card uk-card-default uk-margin-medium-bottom uk-width-1-1 uk-border-rounded uk-box-shadow-medium">
                <div className="uk-card-header">
                    <div className=" uk-flex-left uk-grid">
                        <div className="uk-flex uk-width-expand">
                            <p className="uk-text-bold uk-text-emphasis">{title}</p>
                        </div>
                        <div className="uk-width-auto uk-last-column">

                            <a className="uk-text-warning" onClick={handleBookmark} style={{ fill: `${isBookmarked && 'red'}` }}>
                                <span uk-icon="bookmark"/>
                            </a>
                            
                        </div>
                    </div>
                </div>
                {
                    !!description &&
                    <div className="uk-card-body" style={{ padding: '20px 40px' }}>
                        <div className="uk-grid-small uk-flex-middle uk-grid">
                            {
                                !!urlToImage &&
                                <div className="uk-width-1-5 uk-first-column uk-border-1">
                                    <img className="uk-border-rounded" width="100" height="100" src={urlToImage} />
                                </div>
                            }
                            <div className="uk-width-expand">
                                <p className="uk-text-left uk-text-emphasis">{description}</p>
                            </div>
                        </div>
                    </div>
                }
                <div className="uk-card-footer">
                    <div className="uk-grid-small uk-flex-middle uk-grid">
                        <div className="uk-width-expand">
                            <a
                                className="uk-text-primary uk-text-small uk-text-italic"
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {get(source, 'name', 'Unknown source')}
                            </a>
                        </div>
                        <div className="uk-width-auto uk-last-column">
                            <p className="uk-text-meta">{decoratePublishDate()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
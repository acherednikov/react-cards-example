// React Core
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory  } from 'react-router-dom';
// Libs
// Hooks
import useTopic from '../../hooks/useTopic';
// Components


const propTypes = {
};
const defaultProps = {
};

const TOPICS = [
    { name: 'general', icon: 'world' },
    { name: 'health', icon: 'heart' },
    { name: 'science', icon: 'database' },
    { name: 'technology', icon: 'print' },
    { name: 'entertainment', icon: 'image' },
    { name: 'business', icon: 'credit-card' },
    { name: 'sports', icon: 'play-circle' },
]

const Subscriptions = ({}) => {
    const history = useHistory();
    const topic = useTopic();

    const isTopicActive = (topicName) => {
        return topic === topicName
    }

    const handleTopicChange = (topicName) => {
        history.push(`/cards?topic=${topicName}`)
    }

    const renderSubscription = ({ name, icon }) => {
        const checked = isTopicActive(name);

        return (
            <div
                className="uk-flex-row uk-width-1-1"
                style={{ cursor: 'pointer' }}
                onClick={() => handleTopicChange(name)}
            >
                <label className="uk-text-capitalize">
                    <input
                        className="uk-radio uk-margin-right"
                        type="radio"
                        checked={checked}
                    />
                    <span uk-icon={icon} className="uk-margin-right"></span>
                    {name}
                </label>
            </div>
        )
    }

    const subscriptionsRenderer = TOPICS.map(renderSubscription)

    return (
        <div className="uk-card uk-card-default uk-position-absolute uk-margin-left uk-border-rounded uk-box-shadow-medium">
            <div class="uk-card-body">
                <p className="uk-text-bold">Topics</p>
                <div className="uk-flex-column">
                    {subscriptionsRenderer}
                </div>
            </div>
            <div className="uk-card-footer">
                <p className="uk-text-meta">powered by <span class="news-api-logo  uk-icon uk-icon-image"/></p>
            </div>
        </div>
    )
}

Subscriptions.propTypes = propTypes;
Subscriptions.defaultProps = defaultProps;

export default Subscriptions;
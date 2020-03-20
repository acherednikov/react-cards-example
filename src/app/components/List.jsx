// React Core
import React, { useEffect, useState, Children } from 'react';
import PropTypes from 'prop-types';
// Libs
import isEmpty from 'lodash/isEmpty';
// Components

const propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    onPageEndReached: PropTypes.func,
};
const defaultProps = {
    data: [],
    isLoading: true,
    onPageEndReached: () => {},
};

const List = ({
                children,
                data,
                isLoading,
                onPageEndReached,
               }) => {

    const [page, setPage] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (page === 0) {
            setPage((page) => page + 1)
            onPageEndReached()
        }
        // if (!isLoading) {
        //     setPage((page) => page + 1)
        // };
    }, [isLoading, onPageEndReached, setPage]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (isLoading) return;
        console.log('Fetch more list items!');
        // onPageEndReached(page)
    }

    return (
        <>
            {
                isLoading &&
                <div className="uk-flex" uk-spinner="ratio: 2"/>
            }
            {
                !isLoading &&
                <div className="uk-flex uk-flex-top">
                    {children}
                </div>
            }
        </>
    )
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
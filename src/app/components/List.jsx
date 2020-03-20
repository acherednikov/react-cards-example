// React Core
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// Libs
// import isEmpty from 'lodash/isEmpty';
// Components

const propTypes = {
    scrollContainer: PropTypes.object.isRequired,
    data: PropTypes.array,
    pageSize: PropTypes.number,
    isLoading: PropTypes.bool,
    cellRenderer: PropTypes.func,
    onPageEndReached: PropTypes.func,
};
const defaultProps = {
    data: [],
    pageSize: 20,
    isLoading: true,
    cellRenderer: () => {},
    onPageEndReached: () => {},
};

const List = ({
                  data,
                  pageSize,
                  isLoading,
                  scrollContainer,
                  cellRenderer,
                  onPageEndReached,
              }) => {

    const [page, setPage] = useState(0);

    const memoizedHandleScroll = useCallback(
        () => {
            handleScroll(isLoading, page, scrollContainer, onPageEndReached);
        },
        [isLoading, page, scrollContainer, onPageEndReached],
    );

    useEffect(() => {
        if (!!scrollContainer) {
            scrollContainer.current.addEventListener('scroll', memoizedHandleScroll)
        }
        return () => {
            if (!!scrollContainer) scrollContainer.current.removeEventListener('scroll', memoizedHandleScroll)
        }
    }, [scrollContainer, memoizedHandleScroll]);

    useEffect(() => {
        if (page === 0) {
            console.log('-> list initial load');
            // setPage((page) => page + 1);
            setPage(1);
            onPageEndReached(1)
        }
    }, [page, onPageEndReached]);

    useEffect(() => {
        if (!isLoading) {
            setPage((page) => data.length / pageSize | 0)
        }
    }, [isLoading, data, pageSize, setPage]);

    function handleScroll(isLoading, page, scrollContainer, onPageEndReached) {
        if (isLoading) return;
        if (scrollContainer.current.scrollTop + scrollContainer.current.clientHeight >= scrollContainer.current.scrollHeight) {
            console.log('==>>> LOAD MORE!!!!', page);
            onPageEndReached(page + 1)
        }
    }

    const cardsRenderer = data.map(cellRenderer);

    return (
        <>
            {
                // !isLoading &&
                cardsRenderer
            }
            {
                isLoading &&
                <div className="uk-flex" uk-spinner="ratio: 2"/>
            }
        </>
    )
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
// React Core
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// Libs
import isEmpty from 'lodash/isEmpty';


const propTypes = {
    scrollContainer: PropTypes.object.isRequired,
    data: PropTypes.array,
    fetchError: PropTypes.object,
    pageSize: PropTypes.number,
    isLoading: PropTypes.bool,
    cellRenderer: PropTypes.func,
    onPageEndReached: PropTypes.func,
};
const defaultProps = {
    data: [],
    fetchError: null,
    pageSize: 20,
    isLoading: true,
    cellRenderer: () => {},
    onPageEndReached: () => {},
};

const List = ({
                  data,
                  fetchError,
                  pageSize,
                  isLoading,
                  scrollContainer,
                  cellRenderer,
                  onPageEndReached,
              }) => {

    const [page, setPage] = useState(0);

    const memoizedHandleScroll = useCallback(
        () => handleScroll(isLoading, page, scrollContainer, onPageEndReached),
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
        if (page === 0 && fetchError === null) {
            console.log('-> list initial load');
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
        const scroller = scrollContainer.current;
        if (isLoading || !!fetchError) return;
        if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight) {
            onPageEndReached(page + 1)
        }
    }

    const cardsRenderer = data.map(cellRenderer);

    return (
        <>
            {
                cardsRenderer
            }
            {
                isLoading &&
                <div className="uk-flex" uk-spinner="ratio: 2" style={{ color: 'white' }}/>
            }
            {
                (isEmpty(data) && !isLoading) &&
                <>
                    <p className="uk-text-lead">
                        No cards were found 😔 ... 
                    </p>
                    {
                        !!fetchError &&
                        <p className="uk-flex uk-text-lead">
                            {fetchError.error}
                        </p>
                    }
                </>
            }
        </>
    )
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
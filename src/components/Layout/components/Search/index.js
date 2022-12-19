import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import * as searchService from '~/apiServices/searchService';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            try {
                const result = await searchService.search(debounced);
                setSearchResult(result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <HeadlessTippy
            render={(attrs) => (
                <div {...attrs} className={cx('search-result')} tabIndex="-1">
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            interactive
            visible={showResult && searchResult.length > 0}
            appendTo={document.body}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue.trim() === '' ? '' : searchValue}
                    type="text"
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}

                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
};

export default Search;

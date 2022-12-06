import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const Menu = ({ children, items = [] }) => {
    const renderItems = () => {
        return items.map((item, index) => (
            <MenuItem key={index} data={item} />
        ));
    }

    return (
        <span>
            <Tippy
                render={(attrs) => (
                    <div {...attrs} className={cx('menu-list')} tabIndex="-1">
                        <PopperWrapper className={cx('menu-popper')}>
                            <div>{renderItems()}</div>
                        </PopperWrapper>
                    </div>
                )}
                interactive
                delay={[0, 500]}
                placement="bottom-end"
            >
                {children}
            </Tippy>
        </span>
    );
};

export default Menu;

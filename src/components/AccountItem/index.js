import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const AccountItem = () => {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/3b9b2c7cc984ad3c0afe5a6841197976~c5_100x100.jpeg?x-expires=1670472000&x-signature=xCSN9Q9p5MDlmbGagjJm%2FkSu6Wc%3D"
                alt="Thai"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Quang Thai</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>Quang Thai</span>
            </div>
        </div>
    );
};

export default AccountItem;

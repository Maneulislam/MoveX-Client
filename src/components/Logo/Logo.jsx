import { Link } from 'react-router';
import logo from '../../assets/MoveX-Logo.png'
const Logo = () => {
    return (
        <Link to={'/'}>
            <div className='flex items-center gap-3'>
                <img className='w-16 h-16' src={logo} alt="" />
                <h3 className='text-2xl font-extrabold -ms-4 '>
                    Move<span className='text-[#c0e64e]'>X</span>
                </h3>
            </div>
        </Link>
    );
};

export default Logo;
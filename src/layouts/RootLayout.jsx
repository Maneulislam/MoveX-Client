import { Outlet } from 'react-router';
import NavBar from '../pages/Shared/NavBar/NavBar';
import Footer from '../pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>


            <NavBar />


            <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <main className="flex-grow">
                    <Outlet />
                </main>
            </div>


            <Footer />

        </div>

    );
};

export default RootLayout;
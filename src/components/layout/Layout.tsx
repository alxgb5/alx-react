import React from 'react';
import * as Icon from "react-icons/io";
import { useRoute } from '../../routes/route-provider';
import './layout.scss';
import NavbarMinimal from './Navigation';
import { Nav } from './PublicNav';


interface props {
    children: React.ReactNode;
}

const Layout = ({ children }: props) => {
    const { currentRoute } = useRoute();

    return (
        <>
            {
                currentRoute.includes('admin')
                    ? <AdminLayout>{children}</AdminLayout>
                    :
                    <PublicLayout>{children}</PublicLayout>
            }
        </>
    );
};
export default Layout;


const AdminLayout = ({ children }: props) => {
    return (
        <div className='layout-admin'>
            <div className='menu'>
                <NavbarMinimal />
            </div>
            <div className='content'>
                {children}
            </div>
        </div>
    );
};

const PublicLayout = ({ children }: props) => {
    return (
        <div className='layout-public'>
            <div className='menu'>
                <Nav />
            </div>
            <div className='content'>
                {children}
            </div>
        </div>
    );
};
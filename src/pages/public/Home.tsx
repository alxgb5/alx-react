import React from 'react';
import { useAuth } from '../../hooks/auth-provider';
import { useRoute } from '../../routes/route-provider';
const Home: React.FC = () => {
    const { currentUser, signOut } = useAuth();
    const { currentRoute, getCurrentRouteLabel } = useRoute();
    return (
        <>
            <button onClick={() => { signOut(); }}>SE DECONNECTER</button>
            <main>
                <h1>Welcome to My App</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod
                    purus quis enim cursus, eget suscipit mauris efficitur. Aliquam
                    ullamcorper, risus id consectetur rhoncus, nibh leo rutrum risus, eu
                    faucibus neque nulla at diam. Praesent sit amet ipsum eget est fermentum
                    maximus. Fusce suscipit metus nec lacus congue, vel placerat eros
                    vestibulum.
                </p>
                <p>
                    Donec imperdiet, urna a tristique tincidunt, ipsum erat fermentum ante,
                    vel tincidunt nunc nisi vel odio. Proin posuere lorem non risus lobortis
                    ultricies. Mauris congue metus purus, in sagittis lectus vulputate eu.
                    Proin ut aliquet felis. Integer et ornare urna.
                </p>
            </main>
        </>
    );
};
export default Home;
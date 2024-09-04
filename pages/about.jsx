import React from 'react';
import '/styles/main.css';
import Head from 'next/head';
import Link from 'next/link';

export default function Page() {
    return (
        <div className="about-page">
            <Head>
                <title>About FriendWatch Configurator</title>
                <meta name="description" content="A very simple message board." />
            </Head>
            <div className="header-container">
                <Link href="/" title="Back to main page" className='image-button'><Image src="https://img.icons8.com/?size=32&id=86960&format=png&color=FFFFFF" /></Link>
            </div>
            <h1>About This Website</h1>
            <p>
                FriendWatch Configurator is a GUI for configuring SwitchFriendWatch.
            </p>
            <h2>Credits</h2>
            <p>
                FriendWatch Configurator is a project by James Herron (LittleBit).<br />
                The code for this software is available on <a href="https://github.com/jaherron/FriendWatchConfigurator">GitHub</a>. Licensed under the MIT License.<br /><br />
                This tool is used to configure <a href="https://github.com/littlebitstudios/SwitchFriendWatch">littlebitstudios/SwitchFriendWatch</a>.<br /><br />
                The SwitchFriendWatch utility relies on <a href="https://github.com/samuelthomas2774/nxapi">NXAPI</a> by Samuel Elliott.<br /><br />
                Written using <a href="https://nextjs.org">Next.js</a>, a React framework.<br /><br />
                Public deployments handled by <a href="https://vercel.com">Vercel</a>.<br />
                Domain registration and main website hosting (littlebitstudios.com) handled by <a href="https://www.dreamhost.com">DreamHost</a>.<br /><br />
                All icons used are from <a href="https://icons8.com">Icons8</a>.<br /><br />
                Font used across this website is Inter by Rasmus Andersson.<br />Learn more or download from <a href="https://rsms.me/inter/">the author&apos;s website</a>.<br /><br />
                The Nintendo Switch gaming system, Nintendo Accounts, and any other reference to Nintendo are the property of Nintendo Co. Ltd. and international subsidiaries.<br/>
                Me, contributors to this project, and contributors to the referenced projects are not affiliated with Nintendo.<br />
            </p>

            <h2>Contact Me</h2>
            <p>
                My socials are available from my <a href="https://littlebit670.link">Gravatar page</a>, you may use direct messages to contact me.<br />
                My email is <a href="mailto:littlebit@littlebitstudios.com">littlebit@littlebitstudios.com</a>.
            </p>

            <h2>Privacy Information</h2>
            <p>
                This website uses no analytics or tracking.<br />
                No data is stored on this website&apos;s server, and no browser persistence is used.<br />
                All data is handled locally, using files you give to the website.
            </p>
        </div>
    );
}
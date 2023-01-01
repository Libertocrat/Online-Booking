import React, {useState, useEffect, useContext} from "react";
import styles from "./Website.module.scss";

// Website main component

const Website = (props) => {

    return(
        <div className={styles['website']}>
            <Header
                brandName={props.brandName}
                brandLogo={props.businessLogo}
                navLinks={props.navLinks}
                ctaText={props.ctaHeaderText}
                ctaIcon={props.ctaHeaderIcon}
                ctaClickHandler={props.ctaClickHandler}
            />
            <Hero
                heroTitle={props.heroTitle}
                heroTagline={props.heroTagline}
                heroImage={props.heroImage}
                ctaText={props.ctaHeroText}
                ctaIcon={props.ctaHeroIcon}
                ctaClickHandler={props.ctaClickHandler}
            />
            <Footer
                businessName={props.businessName}
                phoneNumber={props.businessPhone}
                email={props.businessEmail}
                address={props.businessAddress}
            />
        </div>
    );
};

// Header component
const Header = (props) => {

    const [state, setState] = useState({
        brandName: '',
        brandLogo: '',
        navLinks: [],
        ctaText: '',
        ctaIcon: '',
    });

    // Executes at rendering and when props are updated
    useEffect(() => {

        setState((prevState) => {
            return {...prevState,
                brandName: props.brandName,
                brandLogo: props.brandLogo,
                navLinks: props.navLinks,
                ctaText: props.ctaText != '' ? props.ctaText : "Click Here",
                ctaIcon: props.ctaIcon
            }
        });

    }, [props]);

    return (
      <header className={styles['header']}>
        {/* Brand component */}
        <Brand brandName={state.brandName} brandLogo={state.brandLogo} />
        {/* NavMenu component */}
        <NavMenu navLinks={state.navLinks} />
        {/* CTAButton component */}
        <CTAButton onClickHandler={props.ctaClickHandler} ctaText={state.ctaText} ctaIcon={state.ctaIcon}/>
      </header>
    );
};

// Brand component
const Brand = (props) => {
    return (
      <div className={styles['brand']} onClick={props.onClickHandler}>
        {/* Brand logo image */}
        <div className={styles['logo']}>
            <img src={props.brandLogo} alt="Brand logo" />
        </div>
        {/* Business name */}
        <div className={styles['name']}>
            {props.brandName}
        </div>

      </div>
    );
};

// NavMenu component
const NavMenu = (props) => {

    const [state, setState] = useState({
        navLinks: []
    });

    // Executes at rendering and when props are updated
    useEffect(() => {

        setState((prevState) => {
            return {...prevState,
                navLinks: props.navLinks
            }
        });

    }, [props]);

    return(
        <nav className={styles['nav-menu']}>
            <ul>
                {
                    state.navLinks.map( (link, index) => {
                        return(
                            <li key={index}><a href={link.url}>{link.label}</a></li>
                        );
                    })
                }
            </ul>
        </nav>
    );
};

// CTAButton component
const CTAButton = (props) => {
    return(
        <div className={styles['cta-button']} onClick={props.onClickHandler}>
            <span className={`${styles['icon']} material-icons`}>{props.ctaIcon}</span>
            <span className={styles['label']}>{props.ctaText}</span>
        </div>
    );
};

// Hero component
const Hero = (props) => {

    const [state, setState] = useState({
        heroTitle: '',
        heroTagline: ''
    });

    return(
        <section className={styles['hero']}>
            <div className={styles['hero-content']}>
                <h1 className={styles['hero-title']}>{props.heroTitle}</h1>
                <p className={styles['hero-tagline']}>{props.heroTagline}</p>
                <CTAButton ctaText={props.ctaText} ctaIcon={props.ctaIcon} onClickHandler={props.ctaClickHandler}/>
            </div>
            <div className={styles['hero-image']}>
                <img src={props.heroImage} alt="Hero image" />
            </div>
        </section>
    );
};

// Footer component
const Footer = (props) => {

    const [state, setState] = useState({
        address: props.address
    });

    /* This effect is added to make sure that the address is properly passed through props
       in order to avoid errors, since there was an undefined error when trying to render the address
       before the props got the object from the app     */
    useEffect(() => {

        setState((prevState) => {

            return {...prevState,
                address: props.address
            }
        });

    }, [props]);

    if (state.address) {
        return (
            <footer className={styles['footer']}>
                <div className={styles['footer-column']}>
                    {/* Business name */}
                    <p>{props.businessName}</p>
                    {/* Phone number */}
                    <p>{props.phoneNumber}</p>
                    {/* Email */}
                    <p>{props.email}</p>
                </div>
                <div className={styles['footer-column']}>
                    {/* Copyright text */}
                    <p>Copyright © {new Date().getFullYear()} {props.businessName}</p>
                </div>
                <div className={styles['footer-column']}>
                    {/* Address throws and error saying that "props.address" doesn't exist
                        make sure to first get the object through props, before rendering this section
                        useEffect was used for that, adding the props as a dependency */
                    }
                    <p>{state.address['street']}</p>
                    <p>{state.address['city']}, {state.address['state']} {state.address['postalCode']}</p>
                    <p>{state.address['country']}</p>
                </div>
            </footer>
            );
    }
    else {
        return(<div></div>);
    }

}

export default Website;
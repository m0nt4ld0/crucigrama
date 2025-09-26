
import SettingsDropdown from './SettingsDropdown'
import LanguageDropdown from './LanguageDropdown'


// Navbar component that provides language selection functionality and displays the brand logo.
const Navbar = () => {

    // ADD settings and customization options here ***
    return (
        <header>
            <nav className="navbar bg-body-tertiary" id="mainNav">
                <div className="container-fluid"> 
                    <a className="navbar-brand"> 
                        <img src="/images/icons8-crossword-64.png" /> Crucigrama | Crossword Puzzle 
                    </a> 
                </div>
                <div className="container-fluid d-flex justify-content-between align-items-center">
    
                    {/* Left: Language Buttons */}
                    <LanguageDropdown/>

                    {/* Right: Settings Dropdown */}
                    <SettingsDropdown />
                </div>
            </nav>
        </header>
    )
}

export default Navbar

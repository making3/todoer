import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const TodoSection = ({ children, title }) => {
    const [isSectionShown, setIsSectionShown] = useState(false);

    const handleSectionToggle = () => {
        setIsSectionShown(!isSectionShown);
    };

    return (
        <div className="todo-section">
            <div className="todo-section-title">
                <div className="toggle-button">
                    <FontAwesomeIcon
                        className="toggle-section"
                        onClick={handleSectionToggle}
                        icon={isSectionShown ? faAngleDown : faAngleRight}
                    />
                </div>
                <h1>{title}</h1>
            </div>
            {isSectionShown && children}
        </div>
    );
};

export default TodoSection;

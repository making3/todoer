import cn from 'classnames';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const TodoSection = ({ children, title }) => {
    const [isSectionShown, setIsSectionShown] = useState(false);

    const handleSectionToggle = () => {
        setIsSectionShown(!isSectionShown);
    };
    const sectionClassName = cn('todo-section', {
        'todo-section-collapsed': !isSectionShown,
    });

    return (
        <div className={sectionClassName}>
            <div className="todo-section-title" onClick={handleSectionToggle}>
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

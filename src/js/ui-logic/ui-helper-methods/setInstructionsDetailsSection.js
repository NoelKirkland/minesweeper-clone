import { classNames } from '../ui-elements';

export function setInstructionsDetailsSection(section) {
  const sectionHeader = section.querySelector(
    classNames.instructionsDetailsPanelClass + '__section_section-header'
  );
  const sectionText = section.querySelector(
    classNames.instructionsDetailsPanelClass + '__section_section-text'
  );

  section.onmouseover = () => {
    sectionHeader.style.textDecoration = 'underline';
    sectionText.classList.add(classNames.baseClass + '--element-is-visible');
  };

  section.onmouseout = () => {
    sectionHeader.style.textDecoration = 'none';
    sectionText.classList.remove(classNames.baseClass + '--element-is-visible');
  };
}

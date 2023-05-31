import { instructionsDetailsPanelClass, baseClass } from '../classNames';

export function setInstructionsDetailsSection(section) {
  const sectionHeader = section.querySelector(
    instructionsDetailsPanelClass + '__section_section-header'
  );
  const sectionText = section.querySelector(
    instructionsDetailsPanelClass + '__section_section-text'
  );

  section.onmouseover = () => {
    sectionHeader.style.textDecoration = 'underline';
    sectionText.classList.add(baseClass + '--element-is-visible');
  };

  section.onmouseout = () => {
    sectionHeader.style.textDecoration = 'none';
    sectionText.classList.remove(baseClass + '--element-is-visible');
  };
}

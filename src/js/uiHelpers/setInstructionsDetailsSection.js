import { classes } from '../uiVariables';

export function setInstructionsDetailsSection(section) {
  const sectionHeader = section.querySelector(
    classes.instructionsDetailsPanelClass + '__section_section-header'
  );
  const sectionText = section.querySelector(
    classes.instructionsDetailsPanelClass + '__section_section-text'
  );

  section.onmouseover = () => {
    sectionHeader.style.textDecoration = 'underline';
    sectionText.classList.add(classes.baseClass + '--element-is-visible');
  };

  section.onmouseout = () => {
    sectionHeader.style.textDecoration = 'none';
    sectionText.classList.remove(classes.baseClass + '--element-is-visible');
  };
}

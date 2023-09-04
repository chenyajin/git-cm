/*
 * @Author: ChenYaJin
 * @Date: 2023-09-04 09:47:39
 * @LastEditors: ChenYaJin
 * @LastEditTime: 2023-09-04 14:35:43
 * @Description: verify format of the commit message
 */


export {
  resolvePatterns
}

/** verify format of the message */
function resolvePatterns (message) {
  const PATTERN = /^(?:\s*)?(\w*)(\(([\w\$\.\*/-]*)\))?\: (.*)$/;
  const matches = PATTERN.exec(message);

  if (matches) {
    const type = matches[1];
    const scope = matches[3];
    const subject = matches[4];

    return {
      type,
      scope,
      subject,
    };
  }

  return null;
}

/** verify scope */
function isScopeInvalid (scope, { scopeRequired }) {
  const trimScope = scope && scope.trim();

  if (scopeRequired) {
    if (!trimScope) return [true, 'SCOPE_REQUIRED'];
  }

  if (typeof scope === 'string') {
    // scope can be optional, but not empty string
    // @example
    // "test: hello" OK
    // "test(): hello" FAILED
    if (trimScope === '') { return [true, 'SCOPE_EMPTY_STRING']; }
  }

  return [false];
}

// https://github.com/legend80s/git-commit-msg-linter/blob/master/packages/commit-msg-linter/commit-msg-linter.js#L479
// function displayError(
//   {
//     invalidLength = false,
//     invalidFormat = false,
//     type,
//     typeInvalid = false,
//     invalidScope = false,
//     invalidSubject = false,
//   } = {},
//   {
//     mergedTypes,
//     maxLen,
//     minLen,
//     message,
//     example,
//     showInvalidHeader,

//     scopeDescriptions,
//     invalidScopeDescriptions,
//     subjectDescriptions,
//     postSubjectDescriptions,
//     invalidSubjectDescriptions,

//     lang,
//     scopeRequired,
//   },
// ) {
//   const decoratedType = decorate('type', typeInvalid, true);
//   const scope = decorate('scope', invalidScope, scopeRequired);
//   const subject = decorate('subject', invalidSubject, true);

//   const types = Object.keys(mergedTypes);
//   const suggestedType = suggestType(type, types);
//   const typeDescriptions = describeTypes(mergedTypes, suggestedType);

//   const invalid = invalidLength || invalidFormat || typeInvalid || invalidScope || invalidSubject;
//   const translated = getLangData(lang).i18n;
//   const { invalidHeader } = translated;
//   const header = !showInvalidHeader
//     ? ''
//     : `\n  ${invalidFormat ? RED : YELLOW}************* ${invalidHeader} **************${EOS}`;

//   const scopeDescription = scopeDescriptions.join('\n    ');
//   const invalidScopeDescription = invalidScopeDescriptions.join('\n    ');
//   const defaultInvalidScopeDescription = `scope can be ${emphasis('optional')}${RED}, but its parenthesis if exists cannot be empty.`;

//   const subjectDescription = subjectDescriptions.join('\n    ');
//   let postSubjectDescription = postSubjectDescriptions.join('\n    ');
//   postSubjectDescription = postSubjectDescription ? `\n\n    ${italic(postSubjectDescription)}` : '';

//   const invalidSubjectDescription = invalidSubjectDescriptions.join('\n    ');

//   const { example: labelExample, correctFormat, commitMessage } = translated;

//   const correctedExample = typeInvalid
//     ? didYouMean(message, { example, types })
//     : example;

//   console.info(
//     `${header}${invalid ? `
//   ${label(`${commitMessage}:`)} ${RED}${message}${EOS}` : ''}${generateInvalidLengthTips(message, invalidLength, maxLen, minLen, lang)}
//   ${label(`${correctFormat}:`)} ${GREEN}${decoratedType}${scope}: ${subject}${EOS}
//   ${label(`${labelExample}:`)} ${GREEN}${correctedExample}${EOS}

//   ${typeInvalid ? RED : YELLOW}type:
//     ${typeDescriptions}

//   ${invalidScope ? RED : YELLOW}scope:
//     ${GRAY}${scopeDescription}${invalidScope ? `${RED}
//     ${invalidScopeDescription || defaultInvalidScopeDescription}` : ''}

//   ${invalidSubject ? RED : YELLOW}subject:
//     ${GRAY}${subjectDescription}${postSubjectDescription}${invalidSubject ? `${RED}
//     ${invalidSubjectDescription}` : ''}
//   `,
//   );
// }

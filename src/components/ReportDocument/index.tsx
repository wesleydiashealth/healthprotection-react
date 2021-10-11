/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Page,
  Text,
  Link,
  Image,
  View,
  Document,
  Font,
} from '@react-pdf/renderer';

import AnswerData from 'dtos/AnswerData';
import ExcludeData from 'dtos/ExcludesData';
import OutcomeData from 'dtos/OutcomeData';
import SuboutcomeData from 'dtos/SuboutcomeData';
import HabitData from 'dtos/HabitData';

import styles from './styles';

Font.registerHyphenationCallback(word => [word]);

interface ReportDocumentData {
  answers: AnswerData[];
  excludes: ExcludeData;
  outcomes: OutcomeData[];
  suboutcomes: SuboutcomeData[];
  habits: HabitData[];
}

// Create Document Component
const ReportDocument: React.FC<ReportDocumentData> = ({
  answers,
  excludes,
  outcomes,
  suboutcomes,
  habits,
}) => {
  const today = new Date();

  const {
    outcomes: excludedOutcomes,
    suboutcomes: excludedSuboutcomes,
    nutraceuticals: excludedNutraceuticals,
  } = excludes;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.date}>
            test performed on:{' '}
            {`${today.getDate()}/${
              today.getMonth() + 1
            }/${today.getFullYear()}`}
          </Text>
        </View>
        <View style={styles.intro}>
          <Image
            style={styles.introIcon}
            src="/images/healthprotection_icon.png"
          />
          <Text style={styles.introTitle}>Personalized for you</Text>
          <Text style={styles.introDesc}>
            We are glad you are taking care of yourself and we are here to
            support you.
          </Text>
        </View>
        <View style={styles.boxes}>
          <Text style={styles.boxesItem}>
            If you have questions or need more information about your
            recommendation, please contact{' '}
            <Link style={styles.link} src="tel:+154855778877">
              +154 855 77 88 77
            </Link>
          </Text>
          <Text style={styles.boxesItem}>
            Feel free to access{' '}
            <Link style={styles.link} src="https://www.healthprotection.com/">
              healthprotection.com
            </Link>{' '}
            for more information about all of our products and scientific
            researches.
          </Text>
        </View>
        <View style={styles.featured}>
          <Text>
            So now that you have chosen your{' '}
            <Text style={styles.mainColor}>Health Protection</Text> supplements
            there are a few things you will need to know and note.
          </Text>
        </View>
        <View style={styles.answers} break>
          <Text style={styles.sectionTitle}>Your answers in Step 1</Text>
          {answers.map(answer => (
            <View style={styles.answersItem}>
              <Text
                key={answer.question.slug}
                style={styles.answersItemQuestion}
              >
                {answer.question.label.charAt(0).toUpperCase() +
                  answer.question.label.slice(1)}
              </Text>
              <Text style={styles.answersItemAnswer}>
                {answer.answer.label}
              </Text>
              {!!answer.subAnswer && (
                <View>
                  {answer.subAnswer.map(item => (
                    <Text>{`${item.question.label}: ${item.answer.label}`}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        <View style={styles.excludes}>
          <Text style={styles.sectionTitleMt40}>
            What we exclude in this step
          </Text>

          <Text style={styles.sectionLabel}>Outcomes:</Text>
          {excludedOutcomes.length ? (
            excludedOutcomes.map(excludedOutcome => (
              <Text
                key={excludedOutcome.question.slug}
                style={styles.sectionValue}
              >
                {excludedOutcome.question.label}
              </Text>
            ))
          ) : (
            <Text style={styles.sectionValue}>None</Text>
          )}

          <Text style={styles.sectionLabelMt20}>Sub-Outcomes:</Text>
          {excludedSuboutcomes.length ? (
            excludedSuboutcomes.map(excludedSuboutcome => (
              <Text
                key={excludedSuboutcome.question.slug}
                style={styles.sectionValue}
              >
                {`${excludedSuboutcome.question.label} (${
                  excludedSuboutcome.answer.label
                }): ${excludedSuboutcome.exclude.join(', ')}`}
              </Text>
            ))
          ) : (
            <Text style={styles.sectionValue}>None</Text>
          )}

          <Text style={styles.sectionLabelMt20}>Nutraceuticals:</Text>
          {excludedNutraceuticals.length ? (
            excludedNutraceuticals.map(excludedNutraceutical => (
              <Text
                key={excludedNutraceutical.medication.slug}
                style={styles.sectionValue}
              >
                {`${
                  excludedNutraceutical.medication.title
                }: ${excludedNutraceutical.medication.exclude.join(', ')}`}
              </Text>
            ))
          ) : (
            <Text style={styles.sectionValue}>None</Text>
          )}
        </View>
        <View style={styles.Outcomes} break>
          <Text style={styles.sectionTitle}>
            Your desire outcomes in Step 2
          </Text>
          {outcomes.map(outcome => (
            <View key={outcome.id} style={styles.outcome}>
              <Image
                style={styles.outcomeIcon}
                src={`/icons/outcomes/${outcome.id}.jpg`}
              />
              <Text style={styles.outcomeTitle}>{outcome.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.subOutcomes}>
          <Text style={styles.sectionTitleMt40}>
            Your desire sub-outcomes in Step 2
          </Text>
          {suboutcomes.map(suboutcome => (
            <View key={suboutcome.id} style={styles.suboutcome}>
              <Text style={styles.suboutcomeTitle}>{suboutcome.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.eatingHabits}>
          <Text style={styles.sectionTitleMt40}>
            About your eating habits in Step 3
          </Text>
          {habits.map(habit => (
            <View key={habit.food} style={styles.habit}>
              <Image style={styles.habitIcon} src={habit.icon} />
              <View style={styles.habitContent}>
                <Text style={styles.habitTitle}>{habit.food}: </Text>
                <Text style={styles.habitFrequency}>{habit.frequency}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* <View style={styles.excludes}>
          <Text style={styles.sectionTitleMt40}>
            What we exclude in this step
          </Text>
          <Text style={styles.sectionLabel}>
            Through your eating habits and areas you want to take care of, our
            scientific base along with our AI has ruled out the following
            nutraceuticals:
          </Text>
          <Text style={styles.sectionValue}>Reishi</Text>
          <Text style={styles.sectionValue}>Ômega 3</Text>
        </View> */}
        <View>
          <Text style={styles.sectionTitleMt40}>Your result</Text>
          <Text style={styles.sectionLabel}>
            Each pack contains 30-day capsules. Check which nutraceuticals can
            help you and the recommended daily dose.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReportDocument;

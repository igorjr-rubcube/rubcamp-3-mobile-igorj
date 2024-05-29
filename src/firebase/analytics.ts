import {firebase} from '@react-native-firebase/analytics';
import {CreateUserData} from '../axios/api/onboarding';
import dayjs from 'dayjs';

export const logEventOnboarding = async (
  userId: string,
  userData: CreateUserData,
  initialTime: string,
) => {
  const age = dayjs().diff(userData.birthdate, 'year');
  await firebase.analytics().logEvent('onboarding', {
    userId: userId,
    date: new Date().toISOString(),
    age: age,
    accountType: userData.account.type,
    timeToOnboard: dayjs().diff(initialTime, 'second'),
  });
};

export const logEventTransferMade = async (
  userId: string,
  amount: number,
  accountType: string,
) => {
  await firebase.analytics().logEvent('transfer_made', {
    userId: userId,
    date: new Date().toISOString(),
    amount: amount,
    accountType: accountType,
  });
};

export const logEventTransferMethod = async (method: string) => {
  await firebase.analytics().logEvent('transfer_method', {
    method: method,
  });
};

export const logEventTransferScheduled = async (
  timeUntilDateInDays: number,
) => {
  await firebase.analytics().logEvent('transfer_scheduled', {
    timeUntilDateInDays: timeUntilDateInDays,
  });
};

export const logEventShareBankData = async () => {
  await firebase.analytics().logEvent('share_bank_data', {});
};

export const logEventRequestForgotPasswordEmail = async (userId: string) => {
  await firebase.analytics().logEvent('request_forgot_password_email', {
    userId: userId,
  });
};

export const logEventUserChangeAccount = async (
  userId: string,
  accountType: string,
) => {
  await firebase.analytics().logEvent('user_change_account', {
    userId: userId,
    accountType: accountType,
  });
};

export const logEventUserFaq = async (userId: string, faqId: string) => {
  await firebase.analytics().logEvent('user_faq', {
    userId: userId,
    faqId: faqId,
  });
};

import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {getFaqs} from '../../axios/api/faq';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import FaqModal from '../faqModal/FaqModal';
import {FaqCard, FaqTitle, FaqView, Screen} from './FaqScreen.styles';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Faq'>;
};

type Faq = {
  id: string;
  title: string;
  content: string;
  clickCount: number;
  likeCount: number;
  dislikeCount: number;
};

function FaqScreen({navigation}: Props) {
  const [faqs, setFaqs] = useState([] as Faq[]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState<string | React.JSX.Element>(
    '',
  );
  const [selectedFaq, setSelectedFaq] = useState({} as Faq);

  const dispatch = useDispatch();

  const openFaq = (faq: Faq) => {
    setSelectedFaq(faq);
    setModalVisible(true);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      const response = await getFaqs();
      if (response) {
        if (response.code === 200 && response.data) {
          setFaqs(response.data);
        }
      }
    };
    fetchData().then(() => dispatch(setLoading(false)));
  }, []);

  return (
    <>
      <FaqModal
        faq={selectedFaq}
        setVisible={setModalVisible}
        visible={modalVisible}
      />
      <Screen>
        <ScrollView>
          <FaqView>
            {faqs.map((faq, index) => {
              return (
                <FaqCard key={index} onPress={() => openFaq(faq)}>
                  <FaqTitle>{faq.title}</FaqTitle>
                </FaqCard>
              );
            })}
          </FaqView>
        </ScrollView>
      </Screen>
    </>
  );
}

export default FaqScreen;

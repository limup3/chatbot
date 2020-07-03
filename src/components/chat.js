import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age } = steps;

    this.setState({ name, gender, age });
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>고객정보</h3>
        <table>
          <tbody>
            <tr>
              <td>이름</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>성별</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>나이</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
        <p>의심되는 질병은:</p><br/>
        <h3>코로나</h3>
        <p>
         당장 근처에있는 보건소에 가서 진료받으세요 !! 굉장히 위험합니다.<br/>
        {/* 또한,<br/> 아래의 질병들도 의심해볼 수 있습니다.    */}
        </p>

      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class chat extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: '1',
            message: '이름을 알려주세요!',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '2',
          },
          {
            id: '2',
            message: '나이를 알려주세요!',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: '3',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return `${value}? 나이가 너무 어려요`;
              } else if (value > 120) {
                return `${value}? 나이가 너무 많아요`;
              }

              return true;
            },
          },
          {
            id: '3',
            message: '성별을 알려주세요!',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: '남성', label: '남성', trigger: '4' },
              { value: '여성', label: '여성', trigger: '4' },
            ],
              trigger: '4'
          },
          {
            id: '4',
            message: '통증이 있는 곳을 눌러주세요!',
            trigger: 'male',
          },
          {
            id: 'male',
            options: [
              { value: 'Chest',   label: '가슴',      trigger: '5' },
              { value: 'Pelvis',  label: '골반',      trigger: '5' },
              { value: 'Ears',    label: '귀',        trigger: '5'},
              { value: 'Eyes',    label: '눈',        trigger: '5'},
              { value: 'Legs',    label: '다리',      trigger: '5'},
              { value: 'Waist',   label: '허리',      trigger: '5' },
              { value: 'Head',    label: '머리',      trigger: '5'},
              { value: 'Neck',    label: '목',        trigger: '5'},
              { value: 'Belly',   label: '배',        trigger: '5' },
              { value: 'Foots',   label: '발',        trigger: '5' },
              { value: 'Urology', label: '생식기',    trigger: '5'},
              { value: 'Hand',    label: '손',        trigger: '5'},
              { value: 'Hip',     label: '엉덩이',    trigger: '5'},
              { value: 'Mouse',   label: '입',        trigger: '5' },
              { value: 'Nose',    label: '코',        trigger: '5'},
              { value: 'Arms',    label: '팔',        trigger: '5'},
              { value: 'Skin',    label: '피부',      trigger: '5'},
              { value: 'Body',    label: '전신',      trigger: '5'},
              { value: 'Etc',     label: '기타',      trigger: '5'},
            ],
          },
          {
            id: '5',
            message: '진료과목을 선택하세요 !',
            trigger: 'subject',
          }, 
          {
            id: 'subject',
            options: [
              { value: 'Chest',   label: '내과',      trigger: '6' },
              { value: 'Pelvis',  label: '일반외과',      trigger: '6' },
              { value: 'Ears',    label: '응급의학과',        trigger: '6'},
              { value: 'Eyes',    label: '신경과',        trigger: '6'},
              { value: 'Legs',    label: '이비인후과',      trigger: '6'},
              { value: 'Waist',   label: '소아청소년과',      trigger: '6' },
              { value: 'Head',    label: '피부과',      trigger: '6'},
              { value: 'Neck',    label: '암센터',        trigger: '6'},
              { value: 'Belly',   label: '정형외과',        trigger: '6' },
            ],
          },    
          {
            id: '6',
            message: '증상에 대해 알려주세요 !',
            trigger: 'Symptom1',
          }, 
          {
            id: 'Symptom1',
            options: [
                { value: 'Chest',   label: '체온이 37.5도가 넘어요',      trigger: '7' },
                { value: 'Pelvis',  label: '배가 아파요',      trigger: '7' },
                { value: 'Ears',    label: '구토가 나와요',        trigger: '7'},
                { value: 'Eyes',    label: '숨을 쉬기가 어려워요',        trigger: '7'},
                { value: 'Legs',    label: '토할것 같은 느낌이 들어요',      trigger: '7'},
                { value: 'Waist',   label: '두통이 있어요',      trigger: '7' },
            ],
          },         
          {
            id: '7',
            message: '증상을 알려드릴게요 !',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'end-message',
          },
          {
            id: 'end-message',
            message: 
            `건강은 소중합니다. 
            건강에 관련된 판단은 전문적인 의사의 진단과 조언을 따르셔야 합니다. 
            자가검진 서비스는 의학적 조언이 아닌, 자체적인 기준으로 유추한 결과를 보여드립니다. 
            절대 해당 결과만을 가지고 건강 상태를 확신하지 마십시오! 
            참고용으로만 이용해주시기 바랍니다.`,
            end: true,
          },
        ]}
      />
    );
  }
}

export default chat;
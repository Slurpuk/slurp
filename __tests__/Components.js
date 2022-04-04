import renderer from 'react-test-renderer';
import React from 'react';
import CustomButton from '../src/sub-components/CustomButton';
import GreenHeader from '../src/sub-components/GreenHeader';
import WhiteArrowButton from '../src/sub-components/WhiteArrowButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';

describe('Components', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

  describe('Custom sub-components', function () {
    describe('button', function () {
      it('should render correctly', function () {
        const tree = renderer.create(<CustomButton />).toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render correctly with number indicator', function () {
        const tree = renderer
          .create(<CustomButton optionalNumber={5} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
  describe('green header', function () {
    it('should render correctly', function () {
      const tree = renderer.create(<GreenHeader />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('white arrow button', function () {
    jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

    it('Renders an icon', () => {
      const tree = renderer
        .create(<Icon name={'md-chevron-back-circle'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly', function () {
      // const handleBackButtonClick = jest.fn();

      const tree = renderer.create(
        <WhiteArrowButton
          direction={'back'}
          navigation={jest.fn()}
          onPressAction={jest.fn()}
          customStyle={[]}
        />,
      );
      expect(tree).toMatchInlineSnapshot(`
        <View
          accessible={true}
          collapsable={false}
          focusable={true}
          onBlur={[Function]}
          onClick={[Function]}
          onFocus={[Function]}
          onResponderGrant={[Function]}
          onResponderMove={[Function]}
          onResponderRelease={[Function]}
          onResponderTerminate={[Function]}
          onResponderTerminationRequest={[Function]}
          onStartShouldSetResponder={[Function]}
          style={
            Array [
              Object {
                "opacity": 1,
                "underlayColor": "gray",
              },
              Array [],
            ]
          }
          title=""
          underlayColor="transparent"
        >
          <Text
            allowFontScaling={false}
            selectable={false}
            style={
              Array [
                Object {
                  "color": "white",
                  "fontSize": 34,
                },
                undefined,
                Object {
                  "fontFamily": undefined,
                  "fontStyle": "normal",
                  "fontWeight": "normal",
                },
                Object {},
              ]
            }
          >
            
          </Text>
        </View>
      `);
    });

    it('should render correctly if the arrow points back', function () {
      const tree = renderer
        .create(<WhiteArrowButton direction={'left'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly if the arrow points right', function () {
      const tree = renderer
        .create(<WhiteArrowButton direction={'right'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly if the arrow points up', function () {
      const tree = renderer
        .create(<WhiteArrowButton direction={'up'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly if the arrow points down', function () {
      const tree = renderer
        .create(<WhiteArrowButton direction={'down'} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

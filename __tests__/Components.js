import CustomButton from '../src/sub-components/CustomButton';
import renderer from 'react-test-renderer';
import React from 'react';
import GreenHeader from '../src/sub-components/GreenHeader';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { Platform } from "react-native";

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
  describe('green header', function () {
    it('should render correctly', function () {
      const tree = renderer.create(<GreenHeader />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

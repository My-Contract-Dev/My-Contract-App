import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Dimensions } from 'react-native';
import { SkeletonView, View } from 'react-native-ui-lib';

const DetailsSkeleton = () => (
  <BottomSheetFlatList
    data={[0, 1, 2, 3]}
    renderItem={() => (
      <SkeletonView template={SkeletonView.templates.LIST_ITEM} />
    )}
    ListHeaderComponent={() => (
      <View paddingH-24 marginT-16>
        <SkeletonView
          width={Dimensions.get('window').width * 0.6}
          height={26}
        />
        <SkeletonView
          marginT-8
          width={Dimensions.get('window').width * 0.8}
          height={20}
        />
      </View>
    )}
  />
);

export default DetailsSkeleton;

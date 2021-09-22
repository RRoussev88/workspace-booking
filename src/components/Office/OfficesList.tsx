import { AuthContext } from 'authContext';
import AppMessage from 'components/AppMessage';
import ListItem from 'components/ListItem';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import { Office } from 'models/office';
import { AppMessageVariant } from 'models/types';
import { FC, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteOffice, fetchAllOrgOffices, resetState, selectOfficesState } from 'store/officesSlice';

const OfficesList: FC = () => {
  const { orgId } = useParams();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data: offices, error, isLoading } = useSelector(selectOfficesState);

  useEffect(() => {
    if (auth.isLoggedIn()) {
      dispatch(fetchAllOrgOffices(orgId));
    }

    return () => {
      dispatch(resetState());
    };
  }, [auth.isLoggedIn, dispatch, resetState, fetchAllOrgOffices]);

  const handleDel = async (officeId: string) => {
    await dispatch(deleteOffice(officeId));
    dispatch(fetchAllOrgOffices(orgId));
  };

  const renderList = () => {
    if (error) {
      return <AppMessage variant={AppMessageVariant.DANGER} text={error} />;
    }
    return offices.length ? (
      offices.map((office) => (
        <ListItem<Office>
          key={office.id}
          isAuthorized={!!auth.coworker?.coworkerEmail && office.contact.includes(auth.coworker?.coworkerEmail)}
          item={office}
          onDelete={handleDel}
        />
      ))
    ) : (
      <AppMessage variant={AppMessageVariant.INFO} text="No Offices available" />
    );
  };

  return (
    <section className="section__layout">
      <SectionHeading text="Offices List" />
      <hr className="divider" />
      <div className="flex flex-col justify-center overflow-hidden">{isLoading ? <Loader /> : renderList()}</div>
    </section>
  );
};

export default OfficesList;

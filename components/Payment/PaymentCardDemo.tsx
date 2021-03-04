import React, { Component } from 'react';
import { Paper } from '../../../../themes/default/Paper';
import { Typography } from '../../../../themes/default/Typography';
import { PaymentCard } from '../../../../themes/default/PaymentCard';
import { Divider } from '../../../../themes/default/Divider';

/* Line 18 - max-lines */
/* eslint-disable max-lines-per-function */

/**
 * @class
 */
class PaymentCardDemo extends Component
{
    /**
     * @returns {JSX.Element} XMLDocument
     */
    render(): JSX.Element
    {
        return (
            <Paper classes={['w-100', 'd-flex', 'justify-content-center', 'px-3', 'px-md-0', 'm-md-3']}>
                <Paper classes={['bg-white', 'shadow-sm', 'w-100', 'p-4', 'p-md-5']}>
                    <Typography variant="body-medium-24">
                        Payment details
                    </Typography>
                    <Paper classes={['mt-4']}>
                        <Divider/>
                        <Paper classes={['my-3']}>
                            <Paper classes={['mt-3', 'd-flex', 'align-items-baseline', 'justify-content-between']}>
                                <PaymentCard variant="mastercard" classes={['mr-2']} />
                                <Typography variant="body-regular-16" inline>MasterCart ****1234</Typography>
                                <Typography variant="body-regular-14" underline autoWidth inline>
                                    Change
                                </Typography>
                            </Paper>
                            <Typography variant="body-regular-14" classes={['mb-4', 'mt-3']}>
                                Payments for Tages-Anzeiger | Classic
                            </Typography>
                        </Paper>
                        <Divider/>
                        <Paper classes={['my-3']}>
                            <Paper classes={['mt-3', 'd-flex', 'align-items-baseline', 'justify-content-between']}>
                                <PaymentCard variant="visa" classes={['mr-2']} />
                                <Typography variant="body-regular-16" inline>VisaCart ****1234</Typography>
                                <Typography variant="body-regular-14" underline autoWidth inline>
                                    Change
                                </Typography>
                            </Paper>
                            <Typography variant="body-regular-14" classes={['mb-4', 'mt-3']}>
                                Payments for Swiss Family | E-Paper
                            </Typography>
                        </Paper>
                        <Divider/>
                    </Paper>
                </Paper>
            </Paper>
        );
    }
}

export default PaymentCardDemo;